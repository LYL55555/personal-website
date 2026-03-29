import Image from "next/image";

const WindowContent = ({ id }) => {
  // 检测是否为移动设备
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isVerySmall = typeof window !== 'undefined' && window.innerWidth < 480;
  
  // 根据屏幕大小调整图片尺寸
  const imageWidth = isVerySmall ? 180 : isMobile ? 220 : 300;
  const imageHeight = isVerySmall ? 120 : isMobile ? 150 : 200;
  
  switch(id) {
    case 'photography':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I love capturing landscapes and portraits."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
            width={imageWidth} 
            height={imageHeight} 
            alt="photography"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'music':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {
              "Template copy: describe your playlists, instruments, or gigs. Swap the image for your own."
            }
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
            width={imageWidth} 
            height={imageHeight} 
            alt="Music hobby placeholder"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'pet':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {
              'Template copy: introduce your pets (or plush friends) without sharing private photos you do not want public.'
            }
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
            width={imageWidth} 
            height={imageHeight} 
            alt="Pet hobby placeholder"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'travel':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {
              "Template copy: share how you explore the world — weekend hikes, long-haul trips, or dream destinations."
            }
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080"
            width={imageWidth} 
            height={imageHeight} 
            alt="travel"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'fitness':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"Staying active is important to me. I enjoy working out and maintaining a healthy lifestyle."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
            width={imageWidth} 
            height={imageHeight} 
            alt="fitness"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'anime':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I'm passionate about anime and manga. I enjoy various genres and collecting manga series."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477"
            width={imageWidth} 
            height={imageHeight} 
            alt="anime"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'art':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I enjoy drawing and painting. It's a great way to relax and explore my artistic side."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"
            width={imageWidth} 
            height={imageHeight} 
            alt="art"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'volunteer':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I believe in giving back to the community through volunteer activities and teaching."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
            width={imageWidth} 
            height={imageHeight} 
            alt="volunteer"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    default:
      return null;
  }
};

export default WindowContent; 