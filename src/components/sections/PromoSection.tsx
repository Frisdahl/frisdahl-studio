export function PromoSection() {
  return (
    <section id="promo" className="pb-12 lg:pb-16">
      <div className="container-promo overflow-hidden rounded-control-sm">
        <video
          className="h-auto w-full"
          src="/promo_h264.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
