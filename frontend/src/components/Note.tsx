type NoteProps = {
  title: string;
  tags: string[];
  updatedAt: string;
};

const Note = ({ title, tags, updatedAt }: NoteProps) => {
  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-lg">{title}</h1>
      <div className="my-1 lg:flex lg:flex-wrap lg:gap-1">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span className="bg-gray-200 px-2 py-[2px] rounded mr-2 text-sm md:text-base" key={tag}>
              {tag}
            </span>
          ))
        ) : (
          <div className="opacity-30 text-sm md:text-base">No tags yet...</div>
        )}
      </div>
      <p className="md:text-base">{updatedAt.slice(0, 10)}</p>
      <hr className="mt-6" />
    </div>
  );
};

export default Note;
