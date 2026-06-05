export default function SkeletonGrid() {
  return (
    <div className="product-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="product-card skeleton-card" key={index}>
          <div className="skeleton image-skeleton" />
          <div className="skeleton line wide" />
          <div className="skeleton line" />
          <div className="skeleton line short" />
        </div>
      ))}
    </div>
  )
}
