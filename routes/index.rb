# encoding: utf-8
require 'rest_client'
require 'open-uri'

class Pollreddit < Sinatra::Application
  get '/' do 
    send_file File.join('public', 'index.html')
  end

  get '/search' do
    content_type :json
    keyword = URI::encode params[:keyword]
    response = RestClient.get "http://www.reddit.com/search.json?q=#{keyword}&sort=new", { accept: "json" }
    response
  end

  get '/comment' do
    content_type :json
    base = params[:base]
    puts "http://www.reddit.com#{base}.json"
    response = RestClient.get "http://www.reddit.com#{base}.json", { accept: "json" }
    response
  end
end
