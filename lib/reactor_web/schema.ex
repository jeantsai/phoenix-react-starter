defmodule ReactorWeb.Schema do
    use Absinthe.Schema
    use Absinthe.Relay.Schema, :modern
    require Logger

    alias ReactorWeb.Resolvers
  
    @doc """
    Scalar :datetime
    """
    scalar :datetime, name: "DateTime" do
      serialize &NaiveDateTime.to_iso8601(&1)
      parse &parse_datetime/1
    end
    
    @spec parse_datetime(Absinthe.Blueprint.Input.String.t) :: {:ok, DateTime.t} | :error
    @spec parse_datetime(Absinthe.Blueprint.Input.Null.t) :: {:ok, nil}
    defp parse_datetime(%Absinthe.Blueprint.Input.String{value: value}) do
        case NaiveDateTime.from_iso8601(value) do
            {:ok, datetime} -> {:ok, datetime}
            {:error, error} -> :error
        end
    end
    defp parse_datetime(%Absinthe.Blueprint.Input.Null{}) do
        {:ok, nil}
    end
    defp parse_datetime(_) do
      :error
    end

    @doc """
    Interface :node
    """
    node interface do
        resolve_type fn
          %Reactor.Calendar.Task{}, _ ->
            :task
          _, _ ->
            nil
        end
    end


    @doc """
    object Task
    """
    node object :task do
        field :id, non_null(:id)
        field :title, non_null(:string)
        field :description, :string
        field :start, non_null(:datetime)
        field :end, non_null(:datetime)
        field :aborted, :boolean
        field :progress, :integer
    end

    object :task_list do
        field :tasks, list_of(non_null(:task))
    end


    query do
        field :task_list, :task_list do
            resolve fn _, _ ->
                {:ok, %{tasks: Reactor.Calendar.list_tasks()}}
            end
        end

        node field do
            resolve fn
                %{type: :task, id: id}, _ ->
                    {:ok, Reactor.Calendar.get_task!(id)}
            end
        end
    end


    input_object :task_input_object do
        field :title, non_null(:string)
        field :description, :string
        field :start, non_null(:datetime)
        field :end, non_null(:datetime)
        field :aborted, :boolean
        field :progress, :integer
    end

    input_object :task_delete_object do
        
    end

    mutation do
        payload field :delete_task do
            arg :id, non_null(:string)
            output do
                field :task, :task
            end
            resolve &Resolvers.Calendar.delete_task/3
        end

        payload field :update_task do
            input do
                field :id, non_null(:string)
                field :task, non_null(:task_input_object)
            end
            output do
                field :task, :task
            end
            resolve &Resolvers.Calendar.update_task/3
        end

        payload field :create_task_object do
            input do
                field :task, non_null(:task_input_object)
            end
            output do
                field :task, :task
            end
            resolve &Resolvers.Calendar.create_task/3
        end

        payload field :create_task do
            input do
                field :title, non_null(:string)
                field :description, :string
                field :start, non_null(:datetime)
                field :end, non_null(:datetime)
                field :aborted, :boolean
                field :progress, :integer
            end
            output do
                field :success, non_null(:boolean)
            end
            resolve fn
                _, _ ->
                    {:ok, %{success: true}}
            end
        end


        field :create_task_simple, :task do
            arg :title, :string
            arg :description, :string
            arg :start, :datetime
            arg :end, :datetime
            arg :aborted, :boolean
            arg :progress, :integer

            resolve &Resolvers.Calendar.create_task/3
        end
    end

  end