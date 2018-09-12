defmodule ReactorWeb.Schema do
    use Absinthe.Schema
    use Absinthe.Relay.Schema, :modern
    require Logger

    alias Timex.Date
    alias ReactorWeb.Resolvers
  
    scalar :time do
        description "Time (in ISOz format)"
        parse &NaiveDateTime.from_iso8601!(&1)
        serialize &NaiveDateTime.to_iso8601(&1)
    end

    node interface do
        resolve_type fn
          %Reactor.Calendar.Task{}, _ ->
            :task
          _, _ ->
            nil
        end
    end

    node object :task do
        field :id, :id
        field :title, :string
        field :description, :string
        field :start, :time
        field :end, :time
        field :aborted, :boolean
        field :progress, :integer
    end

    query do
        field :all_tasks, list_of(non_null(:task)) do
            resolve fn _, _ ->
                {:ok, Reactor.Calendar.list_tasks()}
            end
        end

        node field do
            resolve fn
                %{type: :task, id: id}, _ ->
                    {:ok, Reactor.Calendar.get_task!(id)}
            end
        end
    end

  end