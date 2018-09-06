# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :reactor,
  ecto_repos: [Reactor.Repo]

# Configures the endpoint
config :reactor, ReactorWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "z2OllTq1x6Khj9mRCD+2RTU7z9cgJ3CF5s/LVh0W6wZeZKevqCaMelHleEqnTg+v",
  render_errors: [view: ReactorWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Reactor.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
