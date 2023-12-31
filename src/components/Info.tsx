import { getSize } from "src/services/files";
import type { File as F, Snippet as S } from "../types/file";
import ImportantText from "./importantText";
import { createResource, Accessor, Setter } from "solid-js";

export function Info(props: {
  files: F[];
  snippets: S[];
  old: Accessor<boolean>;
  setOld: Setter<boolean>;
}) {
  const [size, {}] = createResource(getSize);

  return (
    <div class="rounded-lg bg-textbg p-1">
      <div class="flex justify-between gap-2 rounded-lg bg-background p-2">
        <p class="m-0 leading-5">
          This is a file/snippet sharing service. You can upload files and
          snippets to share them with others. <br />
          Currently{" "}
          <ImportantText>
            {props.files.filter((f) => f.new).length}
          </ImportantText>{" "}
          new files and <ImportantText>{props.files.length}</ImportantText>{" "}
          files are stored on the server using{" "}
          <ImportantText>{Math.round(size() / 1000000)}</ImportantText> MB.{" "}
          <br />
          <ImportantText>
            {props.snippets.filter((f) => f.new).length}
          </ImportantText>{" "}
          new snippets and{" "}
          <ImportantText>{props.snippets.length}</ImportantText> snippets are
          stored in total.
        </p>
        <div class="hidden">
          <a target="_blank" href="https://icons8.com/icon/99961/delete">
            Delete
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
          <a target="_blank" href="https://icons8.com/icon/CEuLWmn45H5H/share">
            Share
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </div>
        <button
          class="focus-visible:outline-solid rounded-lg border-2 border-border bg-transparent
          p-2 focus-visible:bg-background-accent focus-visible:text-accent focus-visible:outline-1
          focus-visible:outline-offset-4 focus-visible:outline-text sm:hover:bg-background-accent sm:hover:text-accent"
          onClick={() => props.setOld(!props.old())}
        >
          {props.old() ? "Hide Old" : "Show Old"}
        </button>
      </div>
    </div>
  );
}
