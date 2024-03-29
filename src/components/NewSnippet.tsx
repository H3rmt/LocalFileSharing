import { createSignal } from "solid-js";
import { isDuplicateSnippet, uploadSnippet } from "../services/snippets";
import ImportantText from "./importantText";
import { toast } from "../services/toast";

export function NewSnippet() {
  const [name, setName] = createSignal("");
  const [snippet, setSnippet] = createSignal<string>("");

  const submit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Submit new snippet");

    if (snippet() === "") {
      toast("No snippet");
      return;
    }
    if (name() === "" || name().length < 3) {
      toast("No name / to short");
      return;
    }

    try {
      if (await isDuplicateSnippet(name())) {
        if (!confirm("Snippet with same name already exists. Upload anyway?"))
          return;
      }
    } catch (e) {
      console.error(e);
      toast("Error checking for duplicate snippet");
      return;
    }

    const formData = new FormData();
    formData.append("name", name());
    formData.append("new", "true");
    formData.append("text", snippet());

    setName("");
    setSnippet("");

    toast("Uploading");
    try {
      await uploadSnippet(formData);
    } catch (e) {
      console.error(e);
      toast("Error uploading snippet");
      return;
    }
    toast("Upload finished");
  };

  const drop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document
      .getElementById("s-dropzone")
      ?.classList.remove("shadow-[inset_0_0_70px_30px_rgba(130,1,120,0.4)]");
    hovering = 0;

    console.log("Drop", e.dataTransfer?.files[0]);

    if (e.dataTransfer?.files === null) return;
    if (e.dataTransfer?.files.length !== 1) {
      toast("Only one file allowed");
      return;
    }
    const file = e.dataTransfer?.files[0] as File;

    setName(file.name);
    console.log("name", file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSnippet(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  let hovering = 0; // 0 = false, 1 = true, 2 = false but delayed

  const dragover = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document
      .getElementById("s-dropzone")
      ?.classList.add("shadow-[inset_0_0_70px_30px_rgba(130,1,120,0.4)]");
    hovering = 1;
  };
  const dragoverleave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    hovering = 2;
    setTimeout(() => {
      if (hovering === 2) {
        document
          .getElementById("s-dropzone")
          ?.classList.remove(
            "shadow-[inset_0_0_70px_30px_rgba(130,1,120,0.4)]",
          );
        hovering = 0;
      }
    }, 120);
  };

  return (
    <div class="flex justify-center">
      <div class="rounded-lg bg-textbg p-1">
        <div
          class="flex justify-center overflow-auto rounded-lg bg-background p-1"
          id="s-dropzone"
        >
          <form
            class="grid w-fit grid-cols-[1fr_auto] grid-rows-[1fr_1fr_auto] gap-4 p-2 sm:grid-cols-[auto_1fr_auto] sm:grid-rows-[1fr_auto]"
            ondragleave={dragoverleave}
            ondragover={dragover}
            ondrop={drop}
            onsubmit={submit}
          >
            <span class="col-span-2 flex w-full items-center justify-center text-3xl font-bold sm:col-span-1">
              Add&nbsp;<ImportantText>Snippet</ImportantText>
            </span>
            <input
              type="text"
              class="focus-visible:outline-solid col-span-1 w-full rounded-lg border-2 border-border bg-transparent p-2
              focus-visible:bg-background-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-offset-4
              focus-visible:outline-text sm:hover:bg-background-accent sm:hover:text-accent"
              value={name()}
              placeholder="Custom Name"
              oninput={(e) => setName(e.target.value)}
            />
            <input
              type="submit"
              class="focus-visible:outline-solid col-span-1 w-full rounded-lg border-2 border-border bg-transparent
            p-2 focus-visible:bg-background-accent focus-visible:text-accent focus-visible:outline-1
            focus-visible:outline-offset-4 focus-visible:outline-text sm:hover:bg-background-accent sm:hover:text-accent"
              value="Upload"
            />
            <div class="col-span-2 max-h-[40dvh] w-full overflow-auto p-1 sm:col-span-3">
              <div
                data-replicated-value={snippet() + "\n"}
                class="grid whitespace-pre after:invisible after:whitespace-pre-wrap after:p-2 after:text-lg after:content-[attr(data-replicated-value)] after:[grid-area:1/1/2/2] "
              >
                <textarea
                  value={snippet()}
                  placeholder="Snippet"
                  class="focus-visible:outline-solid resize-none overflow-hidden rounded-lg border-2 border-border bg-transparent p-2 text-lg text-text 
            [grid-area:1/1/2/2] focus-visible:bg-background-accent focus-visible:text-accent focus-visible:outline-1
            focus-visible:outline-offset-4 focus-visible:outline-text sm:hover:bg-background-accent sm:hover:text-accent"
                  onInput={(e) => {
                    setSnippet(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
