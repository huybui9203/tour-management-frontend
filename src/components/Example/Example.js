import styles from './Example.module.css' // import this line if use css module(not use tailwind)
// tao func Example (viet hoa chu cai dau)
const Example = () => {
    return (
        <div>
            {/* code html here */}
            <h1 className="font-bold text-3xl underline bg-slate-200">This line use tailwindcss</h1> 
            <h1 className={`${styles.example} ${styles.exam}`}>This line use css - not tailwind</h1>
        </div>
    )
}

export default Example