import type {Snippet as S} from '../types/file'
import {For, Accessor} from "solid-js";
import { Snippet } from './Snippet';

export function SnippetList(props: { snippets: S[], old: Accessor<boolean> }) {
  return <ul role="list" class="files">
    <For each={props.snippets.filter(s => props.old() || s.new)}>
      {(snippet) => <Snippet snippet={snippet}/>}
    </For>
  </ul>
}