package com.renhai.manage.repository;

import com.renhai.manage.entity.PSCTester;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by hai on 6/26/17.
 */
@Repository
public interface PSCTesterRepository extends CrudRepository<PSCTester, Integer> {
}
