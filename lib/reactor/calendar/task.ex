defmodule Reactor.Calendar.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :aborted, :boolean, default: false
    field :description, :string
    field :end, :naive_datetime
    field :progress, :integer
    field :start, :naive_datetime
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :start, :end, :description, :progress, :aborted])
    |> validate_required([:title, :start, :end, :description, :progress, :aborted])
  end
end
