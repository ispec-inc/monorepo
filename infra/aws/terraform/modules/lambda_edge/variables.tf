variable "env" {
  type = string
}

variable "role" {
  type = string
}

variable "src_path" {
  type = string
}

variable "runtime" {
  type = string
}

variable "publish" {
  type = bool
}

variable "memory_size" {
  type = number
}

variable "timeout" {
  type = number
}

variable "handler" {
  type    = string
  default = "index.handler"
}
