defmodule Reactor.CalendarTest do
  use Reactor.DataCase

  alias Reactor.Calendar

  describe "tasks" do
    alias Reactor.Calendar.Task

    @valid_attrs %{aborted: true, description: "some description", end: ~N[2010-04-17 14:00:00.000000], progress: 42, start: ~N[2010-04-17 14:00:00.000000], title: "some title"}
    @update_attrs %{aborted: false, description: "some updated description", end: ~N[2011-05-18 15:01:01.000000], progress: 43, start: ~N[2011-05-18 15:01:01.000000], title: "some updated title"}
    @invalid_attrs %{aborted: nil, description: nil, end: nil, progress: nil, start: nil, title: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calendar.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Calendar.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Calendar.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Calendar.create_task(@valid_attrs)
      assert task.aborted == true
      assert task.description == "some description"
      assert task.end == ~N[2010-04-17 14:00:00.000000]
      assert task.progress == 42
      assert task.start == ~N[2010-04-17 14:00:00.000000]
      assert task.title == "some title"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calendar.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = Calendar.update_task(task, @update_attrs)
      
      assert task.aborted == false
      assert task.description == "some updated description"
      assert task.end == ~N[2011-05-18 15:01:01.000000]
      assert task.progress == 43
      assert task.start == ~N[2011-05-18 15:01:01.000000]
      assert task.title == "some updated title"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Calendar.update_task(task, @invalid_attrs)
      assert task == Calendar.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Calendar.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Calendar.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Calendar.change_task(task)
    end
  end
end
