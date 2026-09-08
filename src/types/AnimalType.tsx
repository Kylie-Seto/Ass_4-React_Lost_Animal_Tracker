// AnimalType (e.g., Dog, Cat, Bird, Rabbit, Other)
// Known animal types shown in the dropdown
export type KnownAnimalType = "Dog" | "Cat" | "Hamster" | "Bird" | "Rabbit" | "Other";

// AnimalType is either a known type or a user-supplied custom string (e.g. "Ferret").
// The `string & Record<never, never>` trick keeps the union open while still preserving autocomplete for the known literals.
export type AnimalType = KnownAnimalType | (string & Record<never, never>);