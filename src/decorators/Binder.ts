export default function Binder(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalFn = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalFn.bind(this);
    }
  }
  return adjDescriptor;
}