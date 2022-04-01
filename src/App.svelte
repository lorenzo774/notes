<script lang="ts">
	import type { INote } from './scripts/interfaces';
	import Note from './components/Note.svelte';
	import NoteForm from './components/NoteForm.svelte';
	
	let index = 0;
	let notes: INote[] = [];
	let opened: boolean;
	let newNote: INote;

	const closeForm = function(): void {
		opened = false;
		newNote = { id: index, title: "", description: ""};
	}

	const removeNote = function(e): void {
		const index = notes.findIndex(n => e.detail.id == n.id);
		notes.splice(index, 1);
		notes = notes;
	}

	const addNote = function(): void {
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
	<div class="list-group container w-50">
		{#each notes as note}
			<Note on:remove={removeNote} noteData={note} />
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