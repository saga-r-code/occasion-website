<script>
	document.addEventListener('DOMContentLoaded', async () => {
		try {
			const response = await fetch('/api/admin/category');
			if (!response.ok) throw new Error('Network response was not ok');

			const categories = await response.json();

			const categorySelect = document.getElementById('category');

			// Check if categories array is not empty
			if (categories.length > 0) {
				categories.forEach((category) => {
					const option = document.createElement('option');
					option.value = category.category_id; // Set the value to category_id
					option.textContent = category.category_name; // Display category_name
					categorySelect.appendChild(option);
				});
			} else {
				// Handle empty categories (optional)
				const option = document.createElement('option');
				option.textContent = 'No categories available';
				option.disabled = true;
				categorySelect.appendChild(option);
			}
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	});
</script>

<div>
	<form id="categoryForm">
		<label for="category">Select Category:</label>
		<select id="category" name="category">
			<!-- Options will be populated here -->
		</select>
		<button type="submit">Submit</button>
	</form>
</div>
