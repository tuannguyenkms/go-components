declare module 'flexsearch' {
  interface Index<T> {
    // TODO: Chaining
    readonly id: string
    readonly index: string
    readonly length: number

    init(): any
    init(options: CreateOptions): any
    info(): any
    add(o: T): any
    add(id: number, o: string): any

    // Result without pagination -> T[]
    search(query: string, options: number | SearchOptions, callback: (results: T[]) => void): void
    search(query: string, options?: number | SearchOptions): Promise<T[]>
    search(options: SearchOptions & { query: string }, callback: (results: T[]) => void): void
    search(options: SearchOptions & { query: string }): Promise<T[]>

    // Result with pagination -> SearchResults<T>
    search(
      query: string,
      options: number | SearchOptions & { page?: boolean | Cursor },
      callback: (results: SearchResults<T>) => void
    ): void
    search(query: string, options?: number | SearchOptions & { page?: boolean | Cursor }): Promise<SearchResults<T>>
    search(
      options: SearchOptions & {
        query: string
        page?: boolean | Cursor
      },
      callback: (results: SearchResults<T>) => void
    ): void
    search(options: SearchOptions & { query: string; page?: boolean | Cursor }): Promise<SearchResults<T>>

    update(id: number, o: T): any
    remove(id: number): any
    clear(): any
    destroy(): any
    addMatcher(matcher: Matcher): any

    where(whereFn: (o: T) => boolean): T[]
    where(whereObj: { [key: string]: string }): any
    encode(str: string): string
    export(): string
    import(exported: string): any
  }

  interface SearchOptions {
    limit?: number
    suggest?: boolean
    where?: { [key: string]: string }
    field?: string | string[]
    bool?: 'and' | 'or' | 'not'
    // TODO: Sorting
  }

  interface SearchResults<T> {
    page?: Cursor
    next?: Cursor
    result: T[]
  }

  interface Document {
    id: string
    field: any
  }

  export interface CreateOptions {
    profile?: IndexProfile
    tokenize?: DefaultTokenizer | TokenizerFn
    split?: RegExp
    encode?: DefaultEncoder | EncoderFn | false
    cache?: boolean | number
    async?: boolean
    worker?: false | number
    depth?: false | number
    threshold?: false | number
    resolution?: number
    stemmer?: Stemmer | string | false
    filter?: FilterFn | string | false
    rtl?: boolean
    doc?: Document
  }

  //   limit	number	Sets the limit of results.
  // suggest	true, false	Enables suggestions in results.
  // where	object	Use a where-clause for non-indexed fields.
  // field	string, Array<string>
  // Sets the document fields which should be searched. When no field is set, all fields will be searched.
  // Custom options per field are also supported.
  // bool	"and", "or"	Sets the used logical operator when searching through multiple fields.
  // page	true, false, cursor	Enables paginated results.

  type IndexProfile = 'memory' | 'speed' | 'match' | 'score' | 'balance' | 'fast'
  type DefaultTokenizer = 'strict' | 'forward' | 'reverse' | 'full'
  type TokenizerFn = (str: string) => string[]
  type DefaultEncoder = 'icase' | 'simple' | 'advanced' | 'extra' | 'balance'
  type EncoderFn = (str: string) => string
  interface Stemmer {
    [key: string]: string
  }
  interface Matcher {
    [key: string]: string
  }
  type FilterFn = (str: string) => boolean
  type Cursor = string

  export default class FlexSearch {
    public static create<T>(options?: CreateOptions): Index<T>
    public static registerMatcher(matcher: Matcher): any
    public static registerEncoder(name: string, encoder: EncoderFn): any
    public static registerLanguage(lang: string, options: { stemmer?: Stemmer; filter?: string[] }): any
    public static encode(name: string, str: string): any
  }
}

// FlexSearch.create(<options>)
// FlexSearch.registerMatcher({KEY: VALUE})
// FlexSearch.registerEncoder(name, encoder)
// FlexSearch.registerLanguage(lang, {stemmer:{}, filter:[]})
// FlexSearch.encode(name, string)
