variable "env" {
  type = string
}

variable "app" {
  type = string
}

variable "role" {
  type = string
}

variable "name_prefix" {
  default = ""
}

variable "vpc_id" {
  type = string
}

variable "internal" {
  default = false
}

variable "security_group_names" {
  type = list(string)
}

variable "subnet_names" {
  type = list(string)
}

variable "certificated_domain_name" {
  type = string
}

variable "access_log_bucket_name" {
  type = string
}

variable "target_group_protocol" {
  default = "HTTP"
}

variable "target_group_port" {
  default = 80
}

variable "deregistration_delay" {
  default = 120
}

variable "target_type" {
  default = "instance"
}

variable "health_check" {
  type = map(any)

  default = {
    interval            = 5
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 3
    healthy_threshold   = 5
    unhealthy_threshold = 2
    matcher             = 200
  }
}

variable "ssl_policy" {
  default = ""
}
