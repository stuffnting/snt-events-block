const { InnerBlocks } = wp.blockEditor;
const { useBlockProps } = wp.blockEditor;

export { save };

/**
 * The save function for the events block
 *
 * @returns function  Deals only with the inner-blocks,
 *                    block save functions can not use meta values.
 */
const save = () => {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
