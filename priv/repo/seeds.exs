# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Reactor.Repo.insert!(%Reactor.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Reactor.Repo
alias Reactor.Calendar.Task

%Task{
    title: "Overdue",
    start: DateTime.from_naive!(~N[2018-09-01 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-03 00:00:00.000], "Etc/UTC"),
    description: "A task overdue",
    aborted: false,
    progress: 10,
} |> Repo.insert!
%Task{
    title: "Completed",
    start: DateTime.from_naive!(~N[2018-09-03 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-04 00:00:00.000], "Etc/UTC"),
    description: "A task having been completed",
    aborted: false,
    progress: 100,
} |> Repo.insert!
%Task{
    title: "Behind Schedule",
    start: DateTime.from_naive!(~N[2018-09-07 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-07 00:00:00.000], "Etc/UTC"),
    description: "A task behind schedule",
    aborted: false,
    progress: 10,
} |> Repo.insert!
%Task{
    title: "Canceled",
    start: DateTime.from_naive!(~N[2018-09-02 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-05 00:00:00.000], "Etc/UTC"),
    description: "A task having been aborted",
    aborted: true,
    progress: 10,
} |> Repo.insert!
%Task{
    title: "Overlap #1",
    start: DateTime.from_naive!(~N[2018-09-11 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-12 00:00:00.000], "Etc/UTC"),
    description: "A task overlapping with other tasks",
    aborted: false,
    progress: 10,
} |> Repo.insert!
%Task{
    title: "Overlap #2",
    start: DateTime.from_naive!(~N[2018-09-11 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-12 00:00:00.000], "Etc/UTC"),
    description: "A task overlapping with other tasks",
    aborted: false,
    progress: 10,
} |> Repo.insert!
%Task{
    title: "Overlap #3",
    start: DateTime.from_naive!(~N[2018-09-11 00:00:00.000], "Etc/UTC"),
    end: DateTime.from_naive!(~N[2018-09-14 00:00:00.000], "Etc/UTC"),
    description: "A task overlapping with other tasks",
    aborted: false,
    progress: 10,
} |> Repo.insert!

