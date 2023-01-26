locals {
  name = "${var.name_prefix}${var.env}-${var.app}-${var.role}"
}

data "aws_security_groups" "main" {
  filter {
    name   = "tag:Name"
    values = var.security_group_names
  }
}

data "aws_subnet_ids" "main" {
  vpc_id = var.vpc_id

  filter {
    name   = "tag:Name"
    values = var.subnet_names
  }
}

data "aws_acm_certificate" "main" {
  domain      = var.certificated_domain_name
  statuses    = ["ISSUED"]
  most_recent = true
}

resource "aws_alb" "main" {
  name                       = local.name
  internal                   = var.internal
  security_groups            = data.aws_security_groups.main.ids
  subnets                    = data.aws_subnet_ids.main.ids
  enable_deletion_protection = true

  access_logs {
    bucket  = var.access_log_bucket_name
    prefix  = var.role
    enabled = var.access_log_bucket_name == "" ? false : true
  }

  tags = {
    Environment = var.env
    Application = var.app
    Role        = var.role
    Name        = local.name
  }
}

resource "aws_alb_target_group" "main" {
  name                 = aws_alb.main.name
  protocol             = var.target_group_protocol
  port                 = var.target_group_port
  vpc_id               = var.vpc_id
  deregistration_delay = var.deregistration_delay
  target_type          = var.target_type

  health_check {
    interval            = var.health_check["interval"]
    path                = var.health_check["path"]
    port                = var.health_check["port"]
    protocol            = var.health_check["protocol"]
    timeout             = var.health_check["timeout"]
    healthy_threshold   = var.health_check["healthy_threshold"]
    unhealthy_threshold = var.health_check["unhealthy_threshold"]
    matcher             = var.health_check["matcher"]
  }

  tags = {
    Environment = var.env
    Application = var.app
    Role        = var.role
    Name        = aws_alb.main.name
  }
}

resource "aws_alb_listener" "http_redirect" {
  load_balancer_arn = aws_alb.main.arn
  protocol          = "HTTP"
  port              = 80

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "https" {
  load_balancer_arn = aws_alb.main.arn
  protocol          = "HTTPS"
  port              = 443
  ssl_policy        = var.ssl_policy
  certificate_arn   = data.aws_acm_certificate.main.arn

  default_action {
    target_group_arn = aws_alb_target_group.main.arn
    type             = "forward"
  }
}
