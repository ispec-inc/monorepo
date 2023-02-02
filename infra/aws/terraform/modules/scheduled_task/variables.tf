variable "env" {}

variable "role" {}

variable "name_prefix" {
  default = ""
}

variable "schedule_expression" {
  description = "https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html"
}

variable "is_enabled" {
  default = true
}

variable "target_cluster_arn" {
}

variable "task_definition_arn" {
}

variable "task_count" {
  default = 1
}

variable "vpc_id" {}

variable "subnet_names" {
  type = list(string)
}

variable "security_group_names" {
  type = list(string)
}

variable "task_role_arn" {
}

variable "execution_role_arn" {
}
