# encoding: utf-8
require 'multi_json'
require 'sinatra'
require 'sinatra/activerecord'

class Pollreddit < Sinatra::Application
  enable :sessions

  configure :development do
    if (RUBY_PLATFORM == "java")
      require 'jdbc/sqlite3'
      Jdbc::SQLite3.load_driver
    end
  end

  configure :production do
    set :database, 'postgres://postgres:12345@localhost/sinatra_service'
    if (RUBY_PLATFORM == "java")
      require 'jdbc/postgres'
      Jdbc::Postgres.load_driver
    end
  end
end

require_relative 'helpers/init'
require_relative 'models/init'
require_relative 'routes/init'
