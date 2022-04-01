<script lang="ts">
    import type { INote } from "../scripts/interfaces";
    import { createEventDispatcher } from 'svelte'; 

    const dispatch = createEventDispatcher();

    export let formNote: INote = {
        id: 0,
        title: "",
        description: ""
    };

    const addNote = function() {
        dispatch('addNote')
    }

    const closeForm = function() {
        dispatch('closeForm')
    }
</script>

<div class="list-group-item mt-2 border card row d-flex justify-content-center">
    <label for="">Title</label>
    <input type="text" bind:value={formNote.title} class="card-title" />
    <label for="">Description</label>
    <input bind:value={formNote.description} />
    <br>
    <div class="d-flex justify-content-around">
        <button class="w-50 m-2 btn btn-primary" on:click={addNote}>Save</button>
        <button class="w-50 m-2 btn btn-warning" on:click={closeForm}>Cancel</button>
    </div>
</div>