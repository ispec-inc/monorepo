# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: monorepopb/server/view/user.proto

require 'google/protobuf'

require 'google/protobuf/timestamp_pb'
Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("monorepopb/server/view/user.proto", :syntax => :proto3) do
    add_message "monorepopb.server.view.User" do
      optional :id, :int64, 1
      optional :name, :string, 2
      optional :description, :string, 3
      optional :email, :string, 4
      optional :created_at, :message, 5, "google.protobuf.Timestamp"
      optional :updated_at, :message, 6, "google.protobuf.Timestamp"
    end
  end
end

module UserPb
  User = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("monorepopb.server.view.User").msgclass
end
