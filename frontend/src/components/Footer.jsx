const Footer = ({activeTaskCount, completedTaskCount}) => {
    return (
        <>
        {(completedTaskCount + activeTaskCount ) > 0 && (
            <div className="text-center">
                <p className="text-muted-foreground text-sm">
                    {
                        completedTaskCount > 0 && (
                            <>
                                Great, you are completed {completedTaskCount} task so far
                                {activeTaskCount > 0 && ` ,${activeTaskCount} task left`}
                            </>
                        )
                    }

                    {completedTaskCount === 0 && activeTaskCount > 0 && (
                        <span>Focus on your work, you have {activeTaskCount} task left</span>
                    )}
                </p>
            </div>
        ) } 
        </>
    );
}

export default Footer