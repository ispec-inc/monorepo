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
  type    = string
  default = ""
}

variable "vpc_id" {}

variable "security_group_names" {
  type = list(string)
}

variable "subnet_names" {
  type = list(string)
}

variable "family" {
  type    = string
  default = "aurora-mysql5.7"
}

variable "engine" {
  type    = string
  default = "aurora-mysql"
}

variable "availability_zones" {
  type = list(string)

  default = [
    "ap-northeast-1a",
    "ap-northeast-1c",
  ]
}

variable "database_name" {
  type = string
}

variable "master_username" {
  type = string
}

variable "master_password" {
  type = string
}

variable "backup_retention_period" {
  type    = number
  default = 5
}

variable "preferred_backup_window" {
  type    = string
  default = "19:00-19:30"
}

variable "preferred_maintenance_window" {
  type    = string
  default = "wed:19:30-wed:20:00"
}

variable "skip_final_snapshot" {
  type    = bool
  default = true
}

variable "snapshot_identifier" {
  type    = string
  default = ""
}

variable "slow_query_log" {
  type    = number
  default = 1
}

variable "long_query_time" {
  type    = number
  default = 10
}

variable "max_connections" {
  type = number
}

variable "instance_class" {
  type = string
}

variable "instance_count" {
  type = number
}
