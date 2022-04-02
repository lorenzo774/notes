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
		href="https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css" 
	/>
	<link 
		rel="stylesheet" 
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" 
		crossorigin="anonymous" 
		referrerpolicy="no-referrer" 
	/>
</svelte:head>

<main>
	<br>
	<h1 class="text-center fs-1">Notes</h1>
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
			<div class="bottom-right">
				<button class="btn btn-primary long-btn btn-success" on:click={() => opened = true}>
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
		{/if}
	</div>
</main>

<style>
	.maxw-20em{
		max-width: 50em;
	}

	.bottom-right{
		position: fixed;
		right: 3em;
		bottom: 3em;
	}

	.long-btn{
		border-radius: 50%;
		width: 2.5em;
		height: 2.5em;
		font-weight: bold;
		font-size: 2em;
		box-shadow: 2px 2px 1em black;
	}
</style>