import { TrashIcon } from "@heroicons/react/24/outline";
import { TYPES } from "../constants";
import { Config, ConfigListProps } from "../hooks/useConfigList";
import { cn } from "../utils/cn";

function ConfigItem(props: {
  config: Config;
  currentConfig: ConfigListProps["currentConfig"];
  enterConfig: ConfigListProps["enterConfig"];
  removeConfig: ConfigListProps["removeConfig"];
}) {
  return (
    <li key={props.config.assistant_id}>
      <div
        onClick={() => props.enterConfig(props.config.assistant_id)}
        className={cn(
          props.config === props.currentConfig
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
          "group flex gap-x-3 rounded-md p-2 leading-6 cursor-pointer"
        )}
      >
        <span
          className={cn(
            props.config === props.currentConfig
              ? "text-indigo-600 border-indigo-600"
              : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
          )}
        >
          {props.config.name?.[0] ?? " "}
        </span>
        <div className="flex flex-col">
          <span className="truncate text-sm font-medium">
            {props.config.name}
          </span>
          <span className="truncate text-xs">
            {
              TYPES[
                (props.config.config.configurable?.type ??
                  "agent") as keyof typeof TYPES
              ]?.title
            }
          </span>
        </div>
        <TrashIcon
          className="hidden group-hover:block bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900 text-xs font-bold py-1 px-2 h-5 rounded-lg shadow-sm"
          onClick={() => props.removeConfig(props.config.assistant_id)} />
      </div>
    </li>
  );
}

export function ConfigList(props: {
  configs: ConfigListProps["configs"];
  currentConfig: ConfigListProps["currentConfig"];
  enterConfig: ConfigListProps["enterConfig"];
  removeConfig: ConfigListProps["removeConfig"];
}) {
  return (
    <>
      <div className="text-xs font-semibold leading-6 text-gray-400">
        Your Saved Bots
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {props.configs
          ?.filter((a) => a.mine)
          .map((assistant) => (
            <ConfigItem
              key={assistant.assistant_id}
              config={assistant}
              currentConfig={props.currentConfig}
              enterConfig={props.enterConfig}
              removeConfig={props.removeConfig}
            />
          )) ?? (
          <li className="leading-6 p-2 animate-pulse font-black text-gray-400 text-lg">
            ...
          </li>
        )}
      </ul>

      <div className="text-xs font-semibold leading-6 text-gray-400 mt-4">
        Public Bots
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {props.configs
          ?.filter((a) => !a.mine)
          .map((assistant) => (
            <ConfigItem
              key={assistant.assistant_id}
              config={assistant}
              currentConfig={props.currentConfig}
              enterConfig={props.enterConfig}
              removeConfig={props.removeConfig}
            />
          )) ?? (
          <li className="leading-6 p-2 animate-pulse font-black text-gray-400 text-lg">
            ...
          </li>
        )}
      </ul>
    </>
  );
}
