import { useState, ChangeEvent } from 'react'
import { CategoryInterface, createCategory } from '@/apis/categories'
import { loadCategories } from './_shared'

interface Props {
  updateSelectedCategory: (id: string | null) => void
}

function CategorySetup({ updateSelectedCategory }: Props) {
  const [showCategories, setShowCategories] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryInterface[]>([])

  const [newCategoryName, setNewCategoryName] = useState<string>()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleChangeNewCategoryName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewCategoryName(value)

  const handleClickCreatingNewCategoryButton = async () => {
    if (!newCategoryName) return alert('카테고리 이름을 입력하세요.')

    try {
      const res = await createCategory({
        categoryName: newCategoryName,
      })

      if (!res.ok) {
        throw new Error('Failed to create a category.')
      }

      const categories = await loadCategories()
      setCategories(categories ?? [])

      setNewCategoryName('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickSelectCategoryButton = () => {
    updateSelectedCategory(selectedCategory)
    setShowCategories(false)
  }

  const handleClickAddingCategoryButton = async () => {
    const categories = await loadCategories()
    setCategories(categories ?? [])

    setShowCategories(true)
  }

  return (
    <div>
      <h3>카테고리 설정</h3>

      {showCategories ? (
        <section>
          <input
            value={newCategoryName}
            type="text"
            placeholder="새로운 카테고리 이름을 입력하세요."
            onChange={handleChangeNewCategoryName}
          />
          <div>
            <button type="button" onClick={() => setNewCategoryName('')}>
              취소
            </button>
            <button
              type="button"
              onClick={handleClickCreatingNewCategoryButton}
            >
              카테고리 추가
            </button>
          </div>

          <ul>
            {categories.length ? (
              categories.map(({ _id, categoryName }) => (
                <li key={_id} onClick={() => setSelectedCategory(_id)}>
                  {categoryName}
                </li>
              ))
            ) : (
              <div>카테고리가 없습니다.</div>
            )}
          </ul>
          <button type="button" onClick={() => setShowCategories(false)}>
            취소
          </button>
          <button type="button" onClick={handleClickSelectCategoryButton}>
            선택하기
          </button>
        </section>
      ) : (
        <button type="button" onClick={handleClickAddingCategoryButton}>
          카테고리에 추가하기
        </button>
      )}
    </div>
  )
}

export default CategorySetup
