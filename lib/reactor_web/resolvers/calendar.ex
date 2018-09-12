defmodule ReactorWeb.Resolvers.Calendar do

    def list_tasks(_parent, _args, _resolution) do
        {:ok, Reactor.Calendar.list_tasks()}
    end

end