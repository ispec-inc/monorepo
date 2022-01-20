class CreateFirebaseAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :firebase_accounts do |t|
      t.timestamps
    end

    create_table :firebase_account_details do |t|
      t.references :firebase_account
      t.string :firebase_service_id, null:false, default: ""
      t.timestamps
    end

    create_table :firebase_account_users do |t|
      t.references :firebase_account
      t.references :user
      t.timestamps
    end
  end
end
