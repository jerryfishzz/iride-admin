# ALL THE ISSUES

## Dynamic Form Elements Type

I know how to type a known input in the `elements` property of a submission form object, such as an input with id `username` will look like:

```javascript
interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const elements = (e.target as HTMLFormElement).elements as FormElements
  console.log(elements.username.value)
}

```

What if the input is dynamic?

In my project, I have a form that has some dynamic inputs. So I can't type in advance all the input elements in the interface. I tried to use index signiture and union to include all the types under `HTMLFormControlsCollection`, like:

```javascript
[index: string]: number | HTMLInputElement
```

but just can't cover all the essential types I should put into the union to make Typescipt happy. Anybody can help? Cheers
