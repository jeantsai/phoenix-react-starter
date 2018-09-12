defmodule Reactor.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :start, :naive_datetime
      add :end, :naive_datetime
      add :description, :string
      add :progress, :integer
      add :aborted, :boolean, default: false, null: false

      timestamps()
    end

  end
end
