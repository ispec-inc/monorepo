variable "type" {
  description = "iam type"
}

variable "name" {}

variable "policy_json" {
  default     = ""
  description = "policy.json content"
}

variable "policy_arn" {
  default     = ""
  description = "policy arn to attach, if any"
}
