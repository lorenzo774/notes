<script lang="ts">
    // Imports
    import { createEventDispatcher } from 'svelte'; 
    import type { INote } from '../scripts/interfaces';

    // Variables
    const dispatch = createEventDispatcher();
    let editMode: boolean;
    
    let newData = {
        title: '',
        description: ''
    };

    // Edit mode
    const edit = function() {
        editMode = true;
        newData = {
            title: noteData.title,
            description: noteData.description   
        }
    }
    const exitEditMode = function() {
        editMode = false;
    }

    // Events dispatcher
    const editNote = function() {
        dispatch('edit', {
            id: noteData.id,
            newData
        });
        editMode = false;
    }
    const removeNote = function() {
        dispatch('remove', {
            id: noteData.id
        });
    }

    // Exports
    export let noteData: INote;
</script>

<div class="list-group-item mt-2 border card row d-flex justify-content-center">
    {#if editMode}
        <label for="">Title</label>
        <input type="text" bind:value={newData.title} />
        <br>
        <label for="">Description</label>
        <input type="text" bind:value={newData.description} />
        <br>
        <div class="d-flex justify-content-around">
            <button class="w-50 m-2 btn btn-primary" on:click={editNote}>Edit</button>
            <button class="w-50 m-2 btn btn-warning" on:click={exitEditMode}>Cancel</button>
        </div>
    {:else}
    <div class="container">
        <div class="row justify-content-between">
            <div class="col-md-8">
                <h3 class="card-title">{noteData.title}</h3>
                <hr>
                <p>{noteData.description}</p>
            </div>
            <div class="col-md-auto d-flex flex-column">
                <button class="m-2 w-auto btn btn-secondary" on:click={edit}>Edit</button>
                <button class="m-2 w-auto btn btn-danger" on:click={removeNote}>Remove</button>
            </div>
        </div>
    </div>
    {/if}
</div>