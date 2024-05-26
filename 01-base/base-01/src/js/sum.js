export default function add(...args) {
    return args.reduce((acc, curr) => acc + curr, 0);
}
