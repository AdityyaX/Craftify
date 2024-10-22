export const AboutSection = ({content,img}) => {
    return (
      <>
        <div className="flex flex-row p-16">
          <div className="flex-1 flex items-center justify-center font-[18px]">{content}</div>

          <div className="flex-1">
            <img
              src="https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt283fd2ed6afd3af2/66d95da8a5c597c4455344db/Techsurf.svg?format=pjpg&auto=webp"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </>
    );
}