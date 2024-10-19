<script>
    export let headline;
    export let no;
</script>
<div class="flex flex-col justify-between md:flex-row md:items-center">
    <h1 class=" text-2xl font-semibold order-1 md:order-[0] md:text-3xl">{headline}</h1>
    <p class="text-sm md:text-base text-right">View All ({no})</p>
</div>