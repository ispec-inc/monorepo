variable "env" {}

variable "app" {}

variable "role" {}

variable "name_prefix" {
  default = ""
}

variable "cluster_arn" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "task_definition_arn" {}

variable "desired_count" {
  default = 1
}

variable "target_group_arn" {
  default = ""
}

variable "container_name" {
  type = string
}

variable "container_port" {
  type = number
}

variable "vpc_id" {}

variable "subnet_names" {
  type = list(string)
}

variable "security_group_names" {
  type = list(string)
}

variable "enable_appautoscaling" {}

variable "min_capacity" {
  default = 1
}

variable "max_capacity" {
  default = 2
}

variable "scale_in" {
  type        = map(number)
  description = "parameters to scale in - should be adjusted by load testing"

  default = {
    cooldown           = 60
    scaling_adjustment = 2
    evaluation_period  = 1
    period             = 300
    threshold          = 40
  }
}

variable "scale_out" {
  type        = map(number)
  description = "parameters to scale out - should be adjusted by load testing"

  default = {
    cooldown           = 60
    scaling_adjustment = 1
    evaluation_period  = 1
    period             = 60
    threshold          = 70
  }
}
