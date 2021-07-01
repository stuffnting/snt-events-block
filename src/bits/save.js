/**
 * This save function uses the attributes that are sync with the
 * meta attributes, but are saved as normal attributes.
 *
 *  Trying to use the meta values in the `save` function
 * did not work, and caused unpredictable block errors.
 */

const { InnerBlocks } = wp.blockEditor;
const { useBlockProps } = wp.blockEditor;

export { save };

const save = () => {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
