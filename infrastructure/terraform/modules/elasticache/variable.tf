variable "env" {
}

variable "app" {
}

variable "role" {
}

variable "name_prefix" {
  default = ""
}

variable "node_type" {
  default = "cache.m4.large"
}

variable "port" {
  default = 6379
}

variable "engine" {
  default = "redis"
}

variable "parameter_group_name" {
  default = "default.redis3.2"
}


variable "engine_version" {
  default = "3.2.10"
}


variable "num_cache_nodes" {
  default = 1
}

variable "security_group_names" {
  type = list(string)
}

variable "subnet_group_name" {
  type = string
}
