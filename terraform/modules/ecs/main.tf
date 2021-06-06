locals {
  name  = "${var.name_prefix}${var.env}-${var.app}-${var.role}"
  count = var.enable_appautoscaling ? 1 : 0
}

data "aws_subnet_ids" "main" {
  vpc_id = var.vpc_id

  filter {
    name   = "tag:Name"
    values = var.subnet_names
  }
}

data "aws_security_groups" "main" {
  filter {
    name   = "tag:Name"
    values = var.security_group_names
  }
}

data "aws_iam_role" "appautoscaling_iam_role" {
  count = local.count
  name  = "AWSServiceRoleForApplicationAutoScaling_ECSService"
}

data "aws_lb_target_group" "proxy" {
  name = "${var.env}-${var.app}-proxy"
}

resource "null_resource" "enable_ecs_optin_status" {
  provisioner "local-exec" {
    command = <<EOF
aws ecs put-account-setting-default --name awsvpcTrunking --value enabled
aws ecs put-account-setting-default --name containerInstanceLongArnFormat --value enabled
aws ecs put-account-setting-default --name serviceLongArnFormat --value enabled
aws ecs put-account-setting-default --name taskLongArnFormat --value enabled
EOF
  }
}

resource "aws_ecs_service" "ecs_service" {
  name            = local.name
  cluster         = var.cluster_arn
  task_definition = var.task_definition_arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = data.aws_lb_target_group.proxy.arn
    container_name   = var.container_name
    container_port   = var.container_port
  }

  network_configuration {
    subnets          = data.aws_subnet_ids.main.ids
    security_groups  = data.aws_security_groups.main.ids
    assign_public_ip = true
  }

  tags = {
    Environment = var.env
    Application = var.app
    Role        = var.role
    Name        = local.name
  }
}

resource "aws_appautoscaling_target" "appautoscaling_target" {
  count              = local.count
  min_capacity       = var.min_capacity
  max_capacity       = var.max_capacity
  resource_id        = "service/${var.cluster_name}/${aws_ecs_service.ecs_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  role_arn           = data.aws_iam_role.appautoscaling_iam_role[count.index].arn
  depends_on         = [aws_ecs_service.ecs_service]
}

resource "aws_appautoscaling_policy" "appautoscaling_policy_scale-in" {
  count              = local.count
  name               = "${local.name}-scale-in"
  resource_id        = "service/${var.cluster_name}/${aws_ecs_service.ecs_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = var.scale_in["cooldown"]
    metric_aggregation_type = "Maximum"

    step_adjustment {
      scaling_adjustment          = var.scale_in["scaling_adjustment"] * -1
      metric_interval_lower_bound = -10
      metric_interval_upper_bound = 0
    }

    step_adjustment {
      scaling_adjustment          = var.scale_in["scaling_adjustment"] * -1 * 2
      metric_interval_upper_bound = -10
    }
  }

  depends_on = [
    aws_appautoscaling_target.appautoscaling_target,
  ]
}

resource "aws_cloudwatch_metric_alarm" "cloudwatch_metric_alarm_scale-in" {
  count               = local.count
  alarm_name          = "${local.name}-scale-in"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = var.scale_in["evaluation_period"]
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = var.scale_in["period"]
  threshold           = var.scale_in["threshold"]
  statistic           = "Maximum"

  dimensions = {
    ClusterName = var.cluster_name
    ServiceName = aws_ecs_service.ecs_service.name
  }

  alarm_actions = [
    aws_appautoscaling_policy.appautoscaling_policy_scale-in[count.index].arn,
  ]
}

resource "aws_appautoscaling_policy" "appautoscaling_policy_scale-out" {
  count              = local.count
  name               = "${local.name}-scale-out"
  resource_id        = "service/${var.cluster_name}/${aws_ecs_service.ecs_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = var.scale_out["cooldown"]
    metric_aggregation_type = "Maximum"

    step_adjustment {
      scaling_adjustment          = var.scale_out["scaling_adjustment"]
      metric_interval_lower_bound = 0
      metric_interval_upper_bound = 20
    }

    step_adjustment {
      scaling_adjustment          = var.scale_out["scaling_adjustment"] * 2
      metric_interval_lower_bound = 20
      metric_interval_upper_bound = 40
    }

    step_adjustment {
      scaling_adjustment          = var.scale_out["scaling_adjustment"] * 5
      metric_interval_lower_bound = 40
    }
  }

  depends_on = [
    aws_appautoscaling_target.appautoscaling_target,
  ]
}

resource "aws_cloudwatch_metric_alarm" "cloudwatch_metric_alarm_scale-out" {
  count               = local.count
  alarm_name          = "${local.name}-scale-out"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = var.scale_out["evaluation_period"]
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = var.scale_out["period"]
  threshold           = var.scale_out["threshold"]
  statistic           = "Maximum"

  dimensions = {
    ClusterName = var.cluster_name
    ServiceName = aws_ecs_service.ecs_service.name
  }

  alarm_actions = [
    aws_appautoscaling_policy.appautoscaling_policy_scale-out[count.index].arn,
  ]
}
