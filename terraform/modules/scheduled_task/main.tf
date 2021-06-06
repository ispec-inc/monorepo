locals {
  name = "${var.name_prefix}${var.env}-${var.role}"
}

resource "aws_cloudwatch_event_rule" "schedule_rule" {
  name                = local.name
  schedule_expression = var.schedule_expression
  is_enabled          = var.is_enabled
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

resource "aws_cloudwatch_event_target" "fargate_scheduled_task" {
  rule     = aws_cloudwatch_event_rule.schedule_rule.name
  arn      = var.target_cluster_arn
  role_arn = module.iam.arn

  ecs_target {
    task_definition_arn = var.task_definition_arn
    task_count          = var.task_count
    launch_type         = "FARGATE"

    network_configuration {
      subnets          = data.aws_subnet_ids.main.ids
      security_groups  = data.aws_security_groups.main.ids
      assign_public_ip = true
    }
  }
}

module "iam" {
  source = "../iam"
  type   = "events"
  name   = "${var.env}-${var.role}"

  policy_json = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:RunTask",
                "iam:PassRole"
            ],
            "Resource": [
                "${var.task_role_arn}",
                "${var.execution_role_arn}"
            ]
        }
    ]
}
EOF
}
