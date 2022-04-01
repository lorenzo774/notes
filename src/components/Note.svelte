<script lang="ts">
    import { createEventDispatcher } from 'svelte'; 
    import type { INote } from '../scripts/interfaces';

    const dispatch = createEventDispatcher();

    export let noteData: INote;


    const removeNote = function() {
        dispatch('remove', {
            id: noteData.id
        })
    }

</script>

<div class="list-group-item mt-2 border card row d-flex justify-content-center">
    <h3 class="card-title">{noteData.title}</h3>
    <hr>
    <p>{noteData.description}</p>
    <button class="btn btn-danger" on:click={removeNote}>Remove</button>
</div>