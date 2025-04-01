import Image from 'next/image'
import styles from './Banner.module.css'

export default function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <h2 className={styles.title}>Free shipping</h2>
          <div className={styles.subtitle}>
            <span className={styles.text}>When ordering</span>
            <div className={styles.price}>
              <span>from 40$</span>
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/plant-shop/banner-plant.png"
            alt=""
            fill
            className={styles.image}
          />
        </div>
      </div>
    </div>
  )
}
