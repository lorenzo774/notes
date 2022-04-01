<script lang="ts">
	// Imports
	import type { INote } from './scripts/interfaces';
	import Note from './components/Note.svelte';
	import NoteForm from './components/NoteForm.svelte';
	
	// Variables
	let index = 0;
	let notes: INote[] = [];
	let opened: boolean;
	let newNote: INote;

	// Helper
	const getNoteIndex = function(id: number): number {
		return notes.findIndex(n => n.id === id);
	};

	const closeForm = function() {
		opened = false;
		newNote = { id: index, title: "", description: ""};
	}

	// CRUD
	const removeNote = function(e) {
		const index = getNoteIndex(e.detail.id);
		notes.splice(index, 1);
		notes = notes;
	}

	const editNote = function(e) {
		const newData = e.detail.newData;
		const index = getNoteIndex(e.detail.id);
		const oldNote = notes[index];

		const newNote: INote = {
			id: oldNote.id,
			...newData
		}

		notes[index] = newNote;		
	}

	const addNote = function() {
		notes = [ ...notes, {...newNote}];
		index++;
		newNote = { id: index, title: "", description: ""};
		opened = false;
	}

</script>

<svelte:head>
	<title>Notes</title>
	<!-- CSS only -->
	<link 
		rel="stylesheet" 
		href="https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css" />
</svelte:head>

<main>
	<br>
	<h1 class="text-center">Notes</h1>
	<br>
	<div class="list-group container w-75 maxw-20em">
		{#each notes as note}
			<Note 
				on:remove={removeNote} 
				on:edit={editNote}
				noteData={note} 
			/>
		{/each}
		<br>
		{#if opened}
			<NoteForm 
				bind:formNote={newNote}
				on:addNote={addNote} 
				on:closeForm={closeForm} 
			/>
		{:else}
			<button class="btn btn-primary" on:click={() => opened = true}>Add</button>
		{/if}
	</div>
</main>

<style>
	.maxw-20em{
		max-width: 50em;
	}
</style>