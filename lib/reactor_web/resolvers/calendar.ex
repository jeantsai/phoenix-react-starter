defmodule ReactorWeb.Resolvers.Calendar do
    alias Reactor.Calendar


    def list_tasks(_parent, _args, _resolution) do
        {:ok, Reactor.Calendar.list_tasks()}
    end

    def create_task(_root, %{task: task}, _info) do
        case Calendar.create_task(task) do
            {:ok, task} -> {:ok, %{task: task}}
            {:error, changeset} -> {:error, print_errors(changeset)}
        end
    end

    def create_task(_root, args, _info) do
        case Calendar.create_task(args) do
            {:ok, task} -> {:ok, task}
            {:error, changeset}  -> {:error, changeset.error()}
        end
    end

    def delete_task(_root, %{id: id}, _info) do
        {:ok, %{type: :task, id: task_id}} = Absinthe.Relay.Node.from_global_id(id, ReactorWeb.Schema) 
        task = Calendar.get_task!(task_id)
        case Calendar.delete_task(task) do
            {:ok, task} -> {:ok, %{task: task}}
            {:error, changeset} -> {:error, changeset.error()}
        end
    end

    def delete_task(_, _, _) do
        {:error, "Failed to detele task, no task id being specified!"}
    end


    defp print_errors(changeset) do
        changeset
            |> Ecto.Changeset.traverse_errors(fn {msg, opts} ->
                    Enum.reduce(opts, msg, fn {key, value}, acc ->
                        String.replace(acc, "%{#{key}}", to_string(value))
                    end)
                end)
            |> Enum.map(fn {k, v} -> 
                    "#{k} #{v}\n"
                end)
            |> Enum.join
    end
end