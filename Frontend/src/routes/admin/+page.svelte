<script>
	import Category from '$lib/admin/category.svelte';
	import Navbar from '$lib/admin/navbar.svelte';
</script>

<Navbar />
<div class="admin-side bg-white h-[100vh]">
	<Category />
</div>

<style>
	 .admin-side{
		height: 100vh;
		background-image: linear-gradient(to bottom, #142b4e, #0a3656, #00405d, #004a62, #075466);
	}
</style>
