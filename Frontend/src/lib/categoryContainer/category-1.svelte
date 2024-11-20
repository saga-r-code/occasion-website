<script>
	export let title;
	import video from '../Video/container-bg.mp4';


</script>

<div class="category shadow-lg shadow-slate-900 text-white relative flex flex-col items-center gap-8 p-6 h-[25rem] bg-gradient-to-b from-gray-800 to-black">
    <video autoplay muted loop>
        <source src={video} type="video/mp4" />
    </video>

    <div class="absolute top-20 z-10 flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-5xl xl:text-6xl font-bold mb-4 animated-text">{title}</h1>
        <p class="text-lg font-medium md:w-[50vw] xl:w-[40vw] animated-text">
            At Occasion, we believe that every celebration is a unique story waiting to be told. Our mission is to help you create unforgettable memories through our bespoke decoration services. Our team of experts will collaborate closely with you to understand your vision and bring it to life.
        </p>
    </div>
</div>

<style>
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animated-text {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .category {
        position: relative;
        overflow: hidden;
    }

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.7;
    }
</style>
