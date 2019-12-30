class Task < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true
    validates :day, presence: true
    validates :month, presence: true
    validates :year, presence: true
    validates :tag, presence: true
end
